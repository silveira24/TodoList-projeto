package br.com.silveira.todolist;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import br.com.silveira.todolist.entities.Todo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodolistApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

	@Test
	void testCreatTodoSuccess() {
		var todo = new Todo("Todo 1", "Description 1", false, 1);
		webTestClient
			.post()
			.uri("/todos")
			.bodyValue(todo)
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$").isArray()
			.jsonPath("$.length()").isEqualTo(1)
			.jsonPath("$[0].title").isEqualTo(todo.getTitle())
			.jsonPath("$[0].description").isEqualTo(todo.getDescription())
			.jsonPath("$[0].done").isEqualTo(todo.isDone())
			.jsonPath("$[0].priority").isEqualTo(todo.getPriority());
	}

	@Test
	void testCreatTodoFail() {
		var todo = new Todo("", "", false, 1);
		webTestClient
			.post()
			.uri("/todos")
			.bodyValue(todo)
			.exchange()
			.expectStatus().isBadRequest();
	}

}
