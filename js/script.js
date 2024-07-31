document.querySelectorAll('.contactButton').forEach(button => {
    button.addEventListener('click', function() {
        var contactInfo = this.nextElementSibling;
        if (contactInfo.classList.contains('hidden')) {
            contactInfo.classList.remove('hidden');
        } else {
            contactInfo.classList.add('hidden');
        }
    });
});
