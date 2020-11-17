function showUsers() {
  // GET/READ
  $('.btn').on('click', function () {
    $.ajax({
      url: '/getUsersData',
      contentType: 'application/json',
      success: function (response) {
        response.data.forEach(function (user) {
          $('tbody').append(`
                    <tr>
                        <td class="id">${user.id}</td>
                        <td>${user.name}</td>
                        <td><input name="email" class="email" value="${user.email}"></td>
                        <td>
                        <ul>
                          <li>${user.address.street}</li>
                          <li>${user.address.city}</li>
                          <li>${user.address.zipcode}</li>
                        </ul>
                        <td>
                            <button id="checkButton" data-toggle="modal" data-target="#exampleModalScrollable">Check Email</button>
                        </td>
                    </tr>
                `);
        });
      }
    });
  });
}
// $('#checkButton').on('click', function () {
//   $.ajax({
//     url: '/checkEmail',
//     method: 'GET',
//     data: {email:$('email').val()},
//     contentType: 'application/json',
//     success: function (response) {
//       console.log(data);
//       $('#modalBody').append(info)
//     }

//   })
// })

// function getUser() {
//   $('#checkButton')
//   let row=$(this).closest('tr')
//   let email =row.find('.email').val(); // client
//  // get the user data from server side code
//  console.log(email,row)
//  $.ajax({
//      type: 'POST',
//      url:'/checkEmail',
//      data: {
//          email:email
//      },
//      success: function(info) {
//           //  $('#resultid').html(info);
//           $('#modalBody').append(info)
//      }
//  });
// }


$('table').on('click', '#checkButton', function() {
  console.log($(this))
  var rowEl = $(this).closest('tr');
  console.log(rowEl)
  var email = rowEl.find('.email').val();
  console.log(email)
  $.ajax({
      url: `/checkEmail/${email}`,
      method: 'GET',
      data: JSON.stringify({ email: email }),
      success: function(response) {
          console.log(response);
          $('#modalBody').html('');
          $('#modalBody').append(response)
      }
  });
});
