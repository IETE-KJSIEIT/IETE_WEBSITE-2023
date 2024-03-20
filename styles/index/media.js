document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle sidebar display
    function toggleSidebar() {
        var sidebar = document.querySelector('.sidebar');
        var isOpen = sidebar.classList.toggle('active');
        sidebar.style.width = isOpen ? '300px' : '0'; // Set the width based on sidebar state
    }

    // Click event for menu toggle
    var menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', function () {
        toggleSidebar();
    });

    // Click event for close button
    var closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', function () {
        toggleSidebar();
    });
});
