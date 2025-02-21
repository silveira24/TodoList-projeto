package br.com.silveira.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import br.com.silveira.todolist.entities.Todo;
import br.com.silveira.todolist.repositories.TodoRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> list() {
        Sort sort = Sort.by("priority").descending().and(Sort.by("title").ascending());
        return todoRepository.findAll(sort);
    }

    public List<Todo> save(Todo todo) {
        todoRepository.save(todo);
        return list();
    }

    public List<Todo> update(Todo todo) {
        Optional<Todo> todoOptional = todoRepository.findById(todo.getId());
        if (todoOptional.isPresent()) {
            Todo todoDb = todoOptional.get();
            todoDb.setTitle(todo.getTitle());
            todoDb.setPriority(todo.getPriority());
            todoDb.setDone(todo.isDone());
            todoRepository.save(todoDb);
        } else {
            throw new EntityNotFoundException("Todo not found");
        }
        todoRepository.save(todo);
        return list();
    }

    public List<Todo> delete(Long id) {
        todoRepository.deleteById(id);
        return list();
    }
}
