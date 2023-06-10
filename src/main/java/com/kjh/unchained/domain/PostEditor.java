package com.kjh.unchained.domain;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class PostEditor {
    private String title;
    private String content;
    private LocalDateTime updatedTime;

    public PostEditor(String title, String content,LocalDateTime updatedTime) {
        this.title = title;
        this.content = content;
        this.updatedTime = updatedTime;
    }

    public static PostEditor.PostEditorBuilder builder() {
        return new PostEditorBuilder();
    }

    public static class PostEditorBuilder {
        private String title;
        private String content;
        private LocalDateTime updatedTime = LocalDateTime.now();
        PostEditorBuilder() {
        }

        public PostEditorBuilder title(String title) {
            if(title != null){
                this.title = title;
            }
            return this;
        }

        public PostEditorBuilder content(String content) {
            if(content != null){
                this.content = content;
            }
            return this;
        }
        public PostEditorBuilder updatedTime(){
            this.updatedTime = LocalDateTime.now();
            return this;
        }

        public PostEditor build() {
            return new PostEditor(this.title, this.content,this.updatedTime);
        }

        @Override
        public String toString() {
            return "PostEditorBuilder{" +
                    "title='" + title + '\'' +
                    ", content='" + content + '\'' +
                    ", updatedTime=" + updatedTime +
                    '}';
        }
    }


}
