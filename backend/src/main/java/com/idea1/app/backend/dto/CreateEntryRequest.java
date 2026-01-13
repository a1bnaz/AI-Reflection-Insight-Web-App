package com.idea1.app.backend.dto;

// this DTO is for incoming data- what the frontend sends when creating an entry.
// purpose: user input only. no ai fields. no timestamps. no user object.
public class CreateEntryRequest {

    private String title;
    private String content;

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
}
