function toggleDone() {
  $(this).parent().parent().toggleClass("success");
  updateCounters();
}

function updateCounters() {
  $("#total-count").html($(".todo").length);
  $("#completed-count").html($(".success").length);
  $("#todo-count").html($(".todo").length - $(".success").length);
}

function createTodo(title) {
  var newTodo = {
    title: title,
    completed: false
  };

  var requestObj = {
    type: "POST",
    url: "/todos.json",
    data: JSON.stringify({
      todo: newTodo
    }),
    contentType: "application/json",
    dataType: "json"
  }
  $.ajax(requestObj)
    .done(function() {
      var checkboxId = data.id;

      var label = $('<label></label>')
        .attr('for', checkboxId)
        .html(title);

      var checkbox = $('<input type="checkbox" value="1" />')
        .attr('id', checkboxId)
        .bind('change', toggleDone);

      var tableRow = $('<tr class="todo"></td>')
        .append($('<td>').append(checkbox))
        .append($('<td>').append(label));

      $("#todoList").append(tableRow);

      updateCounters();
    })
    .fail(function(error) {
      error_message = error.responseJSON.title[0];
      showError(error_message);
    });
}


function showError(message = "") {
  var errorHelpBlock = $('<span class="help-block"></span>')
      .attr('id', 'error_message')
      .text(message);

    $("#formgroup-title")
      .addClass("has-error")
      .append(errorHelpBlock);
}

function resetErrors() {
  $("#error_message").remove();
  $("#formgroup-title").removeClass("has-error");
}

function submitTodo(event) {
  event.preventDefault();
  resetErrors();
  createTodo($("#todo_title").val());
  $("#todo_title").val(null);
  updateCounters();
}

function cleanUpDoneTodos(event) {
  event.preventDefault();
  $.when($(".success").remove())
    .then(updateCounters);
}

$(document).ready(function() {
  $("input[type=checkbox]").bind('change', toggleDone);
  $("form").bind('submit', submitTodo);
  $("#clean-up").bind('click', cleanUpDoneTodos);
  updateCounters();
});
