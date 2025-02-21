package br.com.silveira.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.silveira.todolist.entities.Todo;



public interface TodoRepository extends JpaRepository<Todo, Long> {
}