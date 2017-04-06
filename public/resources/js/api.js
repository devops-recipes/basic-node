$(function () {
  $.get('/name', function (data) {
    updateGreeting(data.firstName, data.lastName);
  });

  $('#nameUpdate').click(function () {
    $.ajax({
      url: '/name',
      type: 'PUT',
      data: {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val()
      },
      success: function (data) {
        updateGreeting(data.firstName, data.lastName);
      }
    });

  });

  function updateGreeting(firstName, lastName) {
    $('#nameGreeting').text('Hello, ' + firstName + ' ' + lastName);
    $('#firstNameInput').val(firstName);
    $('#lastNameInput').val(lastName);
    $('#nameUpdate').prop('disabled', false);
  }
});