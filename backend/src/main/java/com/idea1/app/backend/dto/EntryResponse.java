package com.idea1.app.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

// this DTO is for outgoing data- what the backend sends to the frontend.
// purpose: everything the UI needs to render an entry. nothing sensitive. no User object.
public class EntryResponse {
    
    private Long id;
    private String title;
    private String content;

    // AI fields
    private String aiSummary;
    private String aiInsights;
    private List<String> aiThemes;
    private String aiTone;
    private LocalDateTime aiGeneratedAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAiSummary() {
        return aiSummary;
    }

    public void setAiSummary(String aiSummary) {
        this.aiSummary = aiSummary;
    }

    public String getAiInsights() {
        return aiInsights;
    }

    public void setAiInsights(String aiInsights) {
        this.aiInsights = aiInsights;
    }

    public List<String> getAiThemes() {
        return aiThemes;
    }

    public void setAiThemes(List<String> aiThemes) {
        this.aiThemes = aiThemes;
    }

    public String getAiTone() {
        return aiTone;
    }

    public void setAiTone(String aiTone) {
        this.aiTone = aiTone;
    }

    public LocalDateTime getAiGeneratedAt() {
        return aiGeneratedAt;
    }

    public void setAiGeneratedAt(LocalDateTime aiGeneratedAt) {
        this.aiGeneratedAt = aiGeneratedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
