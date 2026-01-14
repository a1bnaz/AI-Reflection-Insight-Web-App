package com.idea1.app.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.idea1.app.backend.dto.AIAnalysisResult;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AIService {
    
    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIService(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public AIAnalysisResult analyzeEntry(String title, String content) throws Exception {
        // construct the AI prompt
        String prompt = """
                Analyze the following journal entry and return a JSON object with 4 fields:
                1. "summary": a 2-3 sentence summary of the entry
                2. "insight": a concise actionable insight or recommendation
                3. "themes": a list of keywords or topics mentioned in the entry
                4. "tone": the overall emotinal tone of the entry, one word
                Do not include any explanation, only output valid JSON.

                Entry:
                Title: %s
                Content: %s
                """.formatted(title, content);

        String requestBody = objectMapper.writeValueAsString(new Object() {
            public String model = "gpt-4o-mini";
            public Object[] messages = new Object[] {
                new Object() {
                    public String role = "user";
                    public String content = prompt;
                }
            };
        });
        
        // call OpenAI
        String response = webClient.post()
                        .uri("/chat/completions")
                        .header("Authorization", "Bearer " + openAiApiKey)
                        .header("Content-Type", "application/json")
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

        // extract the JSON from the AI response
        // the AI responds with JSON inside content: "..."
        // we need to parse it
        String contentJSON = objectMapper.readTree(response)
                            .get("choices")
                            .get(0)
                            .get("message")
                            .get("content")
                            .asText();

        // map the JSON string to AIAnalysisResult
        AIAnalysisResult result = objectMapper.readValue(contentJSON, AIAnalysisResult.class);

        return result;
    }
}
