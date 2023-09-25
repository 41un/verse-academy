const courses = [
    {
        id: 1,
        title: "Crypto 101",
        description: "Get up to speed on decentralized applications, smart contracts, and tokens.",
        imgSrc: "1",
        earnings: "Earn 1000 $VERSE",
        difficulty: "Easy",
        lessons: [
            {
                id: 1,
                title: "Welcome to the course",
                description: "Lorem ipsum dolor sit amet...",
                vimeoId: 867846774,
                quiz: [
                    {
                        question: "What does DApp stand for?",
                        options: [
                            "Digital Application",
                            "Decentralized Application", 
                            "Direct Application",
                            "Desktop Application"
                        ],
                        correctAnswer: "Decentralized Application"
                    },
                    {
                        question: "What is the primary difference between traditional apps and DApps?",
                        options: [
                            "DApps are only available on mobile devices",
                            "DApps operate on a public and transparent blockchain network", 
                            "DApps are always free to use",
                            "DApps can only be used for sports betting"
                        ],
                        correctAnswer: "DApps operate on a public and transparent blockchain network"
                    },
                    {
                        question: "How do you connect to a DApp?",
                        options: [
                            "Using your email and password",
                            "Signing in with your Apple/Google account",
                            "Using your cryptocurrency wallet", 
                            "By answering a security question"
                        ],
                        correctAnswer: "Using your cryptocurrency wallet"
                    },
                    {
                        question: "When you take actions in a DApp that require money, what happens?",
                        options: [
                            "The DApp automatically takes funds from your bank account",
                            "You are redirected to a third-party payment service",
                            "You are asked to approve those transactions in the connected cryptocurrency wallet", 
                            "Nothing, DApps are always free to use"
                        ],
                        correctAnswer: "You are asked to approve those transactions in the connected cryptocurrency wallet"
                    }
                ]
            },
            {
                id: 2,
                title: "What is VERSE?",
                description: "Learn all about VERSE, the rewards and utility token of Bitcoin.com",
                vimeoId: 867846774,
                quiz: [
                    {
                        question: "What does the term \"self-custodial\" mean in the context of cryptocurrency?",
                        options: [
                            "The bank has custody of your funds.",
                            "You rely on a third-party service to manage your funds.",
                            "You and you alone have custody of your funds.",
                            "The government has custody of your funds."
                        ],
                        correctAnswer: "You and you alone have custody of your funds."
                    },
                    {
                        question: "What is one of the challenges VERSE aims to address in the cryptocurrency space?",
                        options: [
                            "High volatility of Bitcoin.",
                            "Onboarding new users to self-custodial and decentralized tools.",
                            "Replacing traditional financial systems.",
                            "Becoming a competitor to Bitcoin."
                        ],
                        correctAnswer: "Onboarding new users to self-custodial and decentralized tools."
                    },
                    {
                        question: "What is the primary purpose of VERSE tokens in the Bitcoin.com ecosystem?",
                        options: [
                            "It's used for mining Bitcoin.",
                            "It serves as a rewards and utility cryptocurrency.",
                            "It's the native token for the Bitcoin.com Card.",
                            "It's used to vote on governance proposals."
                        ],
                        correctAnswer: "It serves as a rewards and utility cryptocurrency."
                    },
                    {
                        question: "Besides being a rewards token, how else can VERSE be used in the Bitcoin.com ecosystem?",
                        options: [
                            "It can be used to mine other cryptocurrencies.",
                            "It's used to pay for advertising on Bitcoin.com's news site.",
                            "It can be converted to Bitcoin automatically.",
                            "It's primarily used for tipping content creators."
                        ],
                        correctAnswer: "It's used to pay for advertising on Bitcoin.com's news site."
                    }
                ]
            },
        ]
    },
]

export default courses;
