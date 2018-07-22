import Vue from 'vue'

export const vm = new Vue({
    data: {
        validRules: {
            title: "required|min:6",
            description: "required|min:10",
            organizerName: "required|min:6",
            location: "required",
            imageUrl: "required|url",
            categorySelect: "required",
            startTime: "required",
            startDate: "required",
            endTime: "required",
            endDate: "required"
        },
        category: [
            "Arts",
            "Business",
            "Charity and Causes",
            "Community",
            "Film and media",
            "Food and drink",
            "Music",
            "Others"
        ],
        firebaseInitialize: {
            apiKey: "AIzaSyCbtFheCZyNr71asy5uVV7ZmZLkGYTLlRg",
            authDomain: "events-app-978ed.firebaseapp.com",
            databaseURL: "https://events-app-978ed.firebaseio.com",
            projectId: "events-app-978ed",
            storageBucket: ""
        },
        googleMapsApi: 'AIzaSyCEQGekztBryFOuW7mdB0FExd5no1Go_r0',
    }

})
