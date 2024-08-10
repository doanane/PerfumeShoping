document.querySelectorAll('.contactButton').forEach(button => {
    button.addEventListener('click', () => {
        // Find the closest parent product element
        const product = button.closest('.product');
        // Find the contactInfo within this product
        const contactInfo = product.querySelector('.contactInfo');
        // Toggle the visibility of the contactInfo
        contactInfo.classList.toggle('hidden');
    });
});

const filterProducts = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.product').forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
};

let debounceTimer;
const debounce = (func, delay) => {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

const debouncedFilterProducts = debounce(filterProducts, 300);

document.getElementById('searchInput').addEventListener('input', debouncedFilterProducts);

// Function to get selected product price in GHS
const getSelectedProductPrice = () => {
    const selectedProduct = document.querySelector('.product.selected');
    return selectedProduct ? parseFloat(selectedProduct.dataset.price) : null;
};

// Function to handle product selection
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        document.querySelectorAll('.product').forEach(p => p.classList.remove('selected'));
        product.classList.add('selected');
    });
});

// Paystack Payment
document.querySelectorAll('.paystack-button').forEach(button => {
    button.addEventListener('click', () => {
        const price = getSelectedProductPrice();
        console.log('Selected price:', price); // Debugging line
        if (price) {
            // Paystack setup assuming price is in GHS and should not be multiplied
            let handler = PaystackPop.setup({
                key: 'pk_live_c11ae7ad0fd5e676589f6840bcd10833616ee178',
                email: 'doanane@st.ug.edu.gh',
                amount: price * 100, // This should be in kobo (for Paystack)
                currency: 'GHS',
                ref: '' + Math.floor(Math.random() * 1000000000 + 1), // Generates a pseudo-unique reference.
                callback: function(response) {
                    alert('Payment successful. Transaction ref is ' + response.reference);
                    window.location.href = '/success.html';
                },
                onClose: function() {
                    alert('Transaction was not completed, window closed.');
                    window.location.href = '/cancel.html';
                }
            });
            handler.openIframe();
        } else {
            alert('Please select a product to purchase.');
        }
    });
});