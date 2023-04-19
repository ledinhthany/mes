const socket = io();
    const chatForm = document.querySelector('#chat-form');
    const chatMes = document.querySelector('#chat-mes');
    const messages = document.querySelector('#messages');
    const roomLink = document.querySelector('#room-link');



    roomLink.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({}, null, '/room');
      // Load trang mới bằng AJAX hoặc fetch()
    });
    
    // Kiểm tra xem tên người dùng đã được lưu trong localStorage hay chưa
    let username = localStorage.getItem('username');
    if (!username) {
      // Nếu chưa, hiển thị phần nhập tên
      username = prompt('Vui lòng nhập tên của bạn:');
      localStorage.setItem('username', username);
    }

    // Hiển thị tên người dùng lên trang
    const userItem = document.createElement('li');
    userItem.textContent = `Chào mừng ${username} đến với ứng phòng chat!`;
    messages.appendChild(userItem);

    // Gửi tin nhắn của người dùng đến server
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatMes.value
      socket.emit('user-chat', {username: username, message: message});
      chatMes.value = ''
    })

    // Nhận tin nhắn từ server và hiển thị lên trang
    socket.on('user-chat', (data) => {
      const chatItem = document.createElement('li');
      chatItem.textContent = `${data.username}: ${data.message}`;
      messages.appendChild(chatItem);
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });