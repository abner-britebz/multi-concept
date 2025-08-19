
app.controller('multi_selectController', ['$scope', '$timeout', function ($scope, $timeout) {
    // Example list of available emails
    $scope.availableEmails = [
        { value: 'alice@example.com', id: '0' },
        { value: 'bob@example.com', id: '1' },
        { value: 'carol@example.com', id: '2' },
        { value: 'dave@example.com', id: '3' },
        { value: 'eve@example.com', id: '4' }
    ];

    $scope.recipients = [];
    $scope.recipientsID = [];
    $scope.recipientText = '';
    $scope.filteredSuggestions = [];

    // Filter suggestions as you type
    $scope.updateSuggestions = function () {
        const typed = $scope.recipientText.toLowerCase();
        $scope.filteredSuggestions = $scope.availableEmails.filter(email =>
            email.value.toLowerCase().includes(typed) &&
            !$scope.recipients.includes(email)
        );
    };

    // Add selected recipient
    $scope.addRecipient = function (array) {
        $scope.recipients.push(array);
        $scope.recipientsID.push(array.id);
        $scope.recipientText = '';
        $scope.filteredSuggestions = [];
    };

    // Remove recipient
    $scope.removeRecipient = function (index) {
        $scope.recipients.splice(index, 1);
    };

    $scope.focusInput = function () {
        document.querySelector('input[ng-model="recipientText"]').focus();
    };

    $scope.checkKey = function (event) {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            if ($scope.recipientText.trim() !== '') {
                $scope.addRecipient($scope.recipientText.trim());
            }
        }
    };

    function logRecipientText() {
        console.log($scope.recipientsID);
        $timeout(logRecipientText, 5000); // schedule again after 50s
    }

    // Start the loop
    logRecipientText();


}]);
