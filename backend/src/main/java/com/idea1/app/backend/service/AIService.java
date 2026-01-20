package com.idea1.app.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

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
        if (openAiApiKey == null || openAiApiKey.isBlank()){
            throw new RuntimeException("OPENAI_API_KEY is missing or empty");
        }
        try {
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
                            .onStatus(
                                status -> status.is4xxClientError() || status.is5xxServerError(),
                                clientResponse -> clientResponse.bodyToMono(String.class)
                                    .map(body -> new RuntimeException("OpenAI API error: " + body))
                            )
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
            
        } catch (WebClientResponseException e) {
            System.err.println("OpenAI API Error - Status: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("OpenAI API request failed: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error analyzing entry with AI: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to analyze entry: " + e.getMessage());
        }
    }
}
