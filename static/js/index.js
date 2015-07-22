$(function() {
    var template;
    
    var context = {
        "user": {
            "title": "Nap Joseph Calub",
            "subtitle": "Web Developer at Ingenuity Global Consulting",
        },
        "careerObjectives": [
            "To pursue a career that will involve the application of my skills in research, software development, and management",
            "To become proficient in different fields and programming languages to create the best solutions"
        ],
        "featuredProjects": [
            {
                "name": "Elsie Information System",
                "description": "A Local Committee Information System for AIESEC in Davao.",
                "technologies": [
                    "Django",
                    "Mezzanine",
                    "AngularJS"
                ],
            },
            {
                "name": "The Hidden Cloud Academy for the Overlooked Skills",
                "description": "A project which incorporates Game-Based Learning with existing cloud technologies to improve reading speed and comprehension.",
                "technologies": [
                    "LimeJS",
                    "NimbusBase",
                    "Django",
                    "REST"
                ],
            },
            {
                "name": "JPLAUREL AIS",
                "description": "An Academic Information System for the Jose P. Laurel Sr. Elementary School.",
                "technologies": [
                    "Visual C# .NET",
                    "MySQL"
                ],
            },
        ],
        "workExperience": [
            {
                "name": "Ingenuity Global Consulting",
                "experience": [
                    {
                        "description": "Web Developer",
                        "dateStarted": "2013",
                        "dateEnded": "present"
                    }
                ],
            },
            {
                "name": "AIESEC in Davao",
                "experience": [
                    {
                        "description": "Director for Information Systems, Marketing and Communications Department",
                        "dateStarted": "2012",
                        "dateEnded": "2014"
                    },
                    {
                        "description": "Logistics Director and Exchange Participant Director for Raising Awareness for Individuals with Needs (R.A.I.N. for Kids) Project",
                        "dateStarted": "2012"
                    },
                ],
            },
        ],
        "education": [
            {
                "school": "Ateneo de Davao University",
                "address": "Roxas Avenue, Davao City, Philippines",
                "degrees": [
                    {
                        "name": "Bachelor of Science in Information Technology",
                        "year": "2014"
                    }
                ]
            }
        ],
    };
    
    template = Handlebars.compile($("#left-column-template").html());
    $("#left-column").html(template(context));
    
    template = Handlebars.compile($("#career-objectives-template").html());
    $("#career-objectives-holder").html(template(context));
    
    template = Handlebars.compile($("#featured-projects-template").html());
    $("#featured-projects-holder").html(template(context));
    
    template = Handlebars.compile($("#work-experience-template").html());
    $("#work-experience-holder").html(template(context));
    
    template = Handlebars.compile($("#education-template").html());
    $("#education-holder").html(template(context));
});
