package com.jchat.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String senderName;
    private String receiverName;
    private String content;
    private LocalDateTime date;
    private Status status;
}
