package com.example.gamewebshop.controller;

import com.example.gamewebshop.dao.CommentRepository;
import com.example.gamewebshop.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    @GetMapping("/{productId}")
    public List<Comment> getCommentsByProductId(@PathVariable Long productId) {
        return commentRepository.findAllByProductId(productId);
    }


}
