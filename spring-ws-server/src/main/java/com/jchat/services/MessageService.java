package com.jchat.services;

import com.jchat.model.Message;

import java.util.List;

public interface MessageService {
    Message saveMessage(Message message);

    List<Message> fetchPreviousRoomMessages(String room);
}
