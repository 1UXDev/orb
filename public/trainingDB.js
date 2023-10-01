// Desc: Training Database - Mock as a DB
export const initialTasks = [
  {
    id: 1,
    title: "Identify and Label key anatomical structures",
    description: "Lorem Ipsum dolor sit amet consectetur adipiscing elit",
    status: "open",
    progress: 0,
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/7a/451870449311e888142d2d9d9fd163/Course-Logo_1.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
  },
  {
    id: 2,
    title: "Tumors, Lesions, or Forgotten Surgical Instruments",
    description: "Lorem Ipsum dolor sit amet consectetur",
    status: "done",
    progress: 100,
    image:
      "https://images.unsplash.com/photo-1581595220057-eefa8c4add1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXJpfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 3,
    title: "Diagnostic Assessments of the Torso",
    description:
      "Lorem Ipsum dolor sit amet consectetur adipiscing elit Lorem LoLo consecetur adipiscing elit Lorem LoLo",
    status: "open",
    progress: 45,
    structure: [
      {
        case: "Case 1: A curious case of a sick patient",
        id: "abc123",
        studies: [
          {
            id: "1b9baeb16d2aeba13bed71045df1bc65",
            aliasName: "Lorem Study",
            description:
              "An easy study to get you started. Get familiar with the interface and the tools.",
            complexity: 1,
          },
          {
            id: "02ef8f31ea86a45cfce6eb297c274598",
            aliasName: "Study Ipsum",
            description:
              "Your first real case, analyze the patient and find the correct diagnosis.",
            complexity: 2,
          },
          {
            id: "9ab20df7b89dd84716029b777ed7a5b2",
            aliasName: "Dolor Study",
            description:
              "Tough mode - no hints, no help. You are on your own. Good luck!",
            complexity: 3,
          },
        ],
      },
      {
        case: "Case 2: The mysterious Old Lady",
        id: "abc456",
        studies: [
          {
            id: "3b1cda064d9d7f2afffac6dab4b6eaf9",
            aliasName: "Study Sit Amet",
            description:
              "An easy study to get you started. Get familiar with the interface and the tools.",
            complexity: 1,
          },
          {
            id: "feb6447a72c9a0a31e1bb4459e547964",
            aliasName: "Consecetur Study",
            description:
              "Can you find the correct diagnosis? This case is a bit more difficult than the first one.",
            complexity: 3,
          },
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXJpfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
  },
];
