const courses = [
    {
        id: 1,
        title: "Crypto 101",
        description: "Move beyond Bitcoin into the world of crypto. Get up to speed on decentralized applications, smart contracts, and tokens.",
        imgSrc: "/path/to/placeholder-image1.jpg",
        earnings: "Earn $5",
        difficulty: "Easy",
        lessons: [
            {
                id: 1,
                title: "Lesson 1: Connecting to a DApp",
                description: "Learn about Decentralized Applications (DApps) and how to safely connect your Bitcoin.com Wallet to them. ",
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
                title: "Lesson 2: Gas",
                description: "Learn about gas, the fuel of decentralized networks.",
                vimeoId: 867919557,
                quiz: [
                    {
                        question: "What is \'gas\' in the context of cryptocurrency?What does the term \"self-custodial\"?",
                        options: [
                            "A type of digital currency.",
                            "The fee you pay to the public network for transactions.",
                            "The graphical user interface of a crypto wallet.",
                            "A security feature to protect your crypto assets."
                        ],
                        correctAnswer: "The fee you pay to the public network for transactions."
                    },
                    {
                        question: "To claim your course rewards in cryptocurrency, what will you need?",
                        options: [
                            "A certificate of completion.",
                            "A multi-signature wallet.",
                            "Gas.",
                            "An internet connection."
                        ],
                        correctAnswer: "Gas."
                    },
                    {
                        question: "What is the native (gas) token for paying fees on the Polygon network?",
                        options: [
                            "USDT.",
                            "MATIC.",
                            "VERSE.",
                            "Bitcoin."
                        ],
                        correctAnswer: "MATIC."
                    },
                    {
                        question: "What happens when you adjust the price of gas for a transaction?",
                        options: [
                            "It changes the amount of cryptocurrency you're sending.",
                            "It speeds up or slows down the transaction.",
                            "It changes the receiving address.",
                            "It encrypts the transaction for extra security."
                        ],
                        correctAnswer: "It speeds up or slows down the transaction."
                    }
                ]
            },
{
                id: 3,
                title: "Lesson 3: VERSE",
                description: "Learn all about VERSE, the rewards and utility token of Bitcoin.com",
                vimeoId: 867921900,
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
            {
                            id: 4,
                            title: "Smart Contracts",
                            description: "Learn about smart contracts, how to interact with them, and an example of using a smart contract in a DApp.",
                            vimeoId: 867954430,
                            quiz: [
                                {
                                    question: "What is a smart contract?",
                                    options: [
                                        "A paper-based legal agreement.",
                                        "A computer program stored on centralized servers.",
                                        "A computer program stored on a decentralized network like blockchains.",
                                        "A special type of email sent over encrypted networks."
                                    ],
                                    correctAnswer: "A computer program stored on a decentralized network like blockchains."
                                },
                                {
                                    question: "Decentralized Applications (DApps) are:",
                                    options: [
                                        "Not related to smart contracts.",
                                        "Made up of two or more smart contracts.",
                                        "Independent of smart contracts.",
                                        "Made up of one or more smart contracts."
                                    ],
                                    correctAnswer: "Made up of one or more smart contracts."
                                },
                                {
                                    question: "For the majority of users, how do they interact with smart contracts?",
                                    options: [
                                        "Directly modifying the contract's code.",
                                        "Through cloud computing interfaces.",
                                        "Via DApps.",
                                        "By emailing the blockchain administrators."
                                    ],
                                    correctAnswer: "Via DApps."
                                },
                                {
                                    question: "When interacting with most smart contracts, what is typically a step a user will undertake?",
                                    options: [
                                        "Paying for cloud storage.",
                                        "Authorizing the use of their wallet's assets.",
                                        "Registering their computer's IP address.",
                                        "Downloading the entire blockchain."
                                    ],
                                    correctAnswer: "Authorizing the use of their wallet's assets."
                                }
                            ]
                        },
            {
                            id: 5,
                            title: "Staking",
                            description: "What is staking and how to stake.",
                            vimeoId: 867960451,
                            quiz: [

                            ]
                        },
        ]
    },
]

export default courses;