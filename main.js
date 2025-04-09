$(function() {
    const usersGrid = $('#usersGrid');
    const loadingIndicator = $('#loadingIndicator');
    const reloadBtn = $('#reloadBtn');
    const userPopup = $('#userPopup');
    const closePopup = $('#closePopup');
    
    fetchUserData();
    
    reloadBtn.on('click', fetchUserData);
    closePopup.on('click', () => {
        userPopup.removeClass('show');
        setTimeout(() => userPopup.addClass('hidden'), 200);
    });
    
    userPopup.on('click', function(e) {
        if (e.target === this) {
            closePopup.trigger('click');
        }
    });
    
    function fetchUserData() {
        loadingIndicator.removeClass('hidden');
        usersGrid.empty();
        
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            dataType: 'json',
            success: function(userData) {
                displayUsers(userData);
            },
            error: function(err) {
                console.log('Oops, something went wrong:', err);
                usersGrid.html(`
                    <div class="col-span-full text-center py-10">
                        <div class="text-red-500 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium">Failed to load users</h3>
                        <p class="text-gray-600 mt-1">Please try again later</p>
                        <button onclick="location.reload()" class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                            Reload Page
                        </button>
                    </div>
                `);
            },
            complete: function() {
                loadingIndicator.addClass('hidden');
            }
        });
    }
    
    function displayUsers(users) {
        usersGrid.empty();
        
        users.forEach((user, index) => {
            setTimeout(() => {
                const userCard = $(`
                    <div class="user-card bg-white rounded-lg p-5 cursor-pointer" data-user-id="${user.id}">
                        <h3 class="text-xl font-semibold mb-1 text-gray-800">${user.name}</h3>
                        <p class="text-gray-500 mb-2">${user.email}</p>
                        <div class="border-t border-gray-100 pt-3 mt-3">
                            <p class="text-sm text-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                ${user.phone}
                            </p>
                            <p class="text-sm text-gray-600 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <a href="http://${user.website}" target="_blank" class="hover:underline hover:text-indigo-600">${user.website}</a>
                            </p>
                        </div>
                    </div>
                `);
                
                userCard.on('click', () => showUserDetails(user));
                usersGrid.append(userCard);
            }, index * 50);
        });
    }
    
    // Show user details in popup
    function showUserDetails(user) {
        $('#popupName').text(user.name);
        $('#popupUsername').text(`@${user.username}`);
        
        const popupContent = $('#popupContent');
        popupContent.html(`
            <div class="space-y-2">
                <p><span class="font-medium">Email:</span> ${user.email}</p>
                <p><span class="font-medium">Phone:</span> ${user.phone}</p>
                <p><span class="font-medium">Website:</span> <a href="http://${user.website}" target="_blank" class="text-indigo-600 hover:underline">${user.website}</a></p>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-4">
                <h4 class="font-medium text-gray-900 mb-2">Address</h4>
                <p>${user.address.street}</p>
                <p>${user.address.suite}</p>
                <p>${user.address.city}, ${user.address.zipcode}</p>
                <p class="text-sm text-gray-500 mt-1">(Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng})</p>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-4">
                <h4 class="font-medium text-gray-900 mb-2">Company</h4>
                <p>${user.company.name}</p>
                <p class="italic text-gray-600">"${user.company.catchPhrase}"</p>
                <p class="text-sm text-gray-500 mt-1">${user.company.bs}</p>
            </div>
        `);
        
        userPopup.removeClass('hidden');
        setTimeout(() => userPopup.addClass('show'), 10);
    }
});