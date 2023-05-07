package com.jchat.services.impl;

import com.jchat.model.Message;
import com.jchat.model.Status;
import com.jchat.repository.MessageRepository;
import com.jchat.services.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MessageServiceImpl implements MessageService {
    private final MessageRepository repository;

    @Override
    public Message saveMessage(Message request) {
        Message message = Message
                .builder()
                .senderName(request.getSenderName())
                .receiverName(
                        request.getReceiverName() == null ?
                                "public" :
                                request.getReceiverName()
                )
                .content(request.getContent())
                .date(
                        request.getDate() == null ?
                                LocalDateTime.now() :
                                request.getDate()
                )
                .status(request.getStatus())
                .build();

        log.info("Message saved --> " + message);

        return repository.save(message);
    }

    @Override
    public List<Message> fetchPreviousRoomMessages(String room) {
        List<Message> messages = repository.findAllByReceiverName(room, Status.MESSAGE.toString());

        return messages.stream().filter(message -> message.getStatus()
                        .equals(Status.MESSAGE))
                .collect(Collectors.toList());
    }
}
