package com.idea1.app.backend.dto;

import java.util.List;

public class AIAnalysisResult {
    
    private String summary;
    private String insight;
    private List<String> themes;
    private String tone;

    // constructors
    public AIAnalysisResult() {}

    public AIAnalysisResult(String summary, String insight, List<String> themes, String tone){
        this.summary = summary;
        this.insight = insight;
        this.themes = themes;
        this.tone = tone;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getInsight() {
        return insight;
    }

    public void setInsight(String insight) {
        this.insight = insight;
    }

    public List<String> getThemes() {
        return themes;
    }

    public void setThemes(List<String> themes) {
        this.themes = themes;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}