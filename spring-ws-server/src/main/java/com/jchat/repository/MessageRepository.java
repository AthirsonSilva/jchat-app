package com.jchat.repository;

import com.jchat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    @Query("{ 'receiverName' : ?0, 'status' : ?1 }")
    List<Message> findAllByReceiverName(String room, String status);
}
