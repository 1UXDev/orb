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
        case: "case 1 Lorem Ipsum",
        id: "abc123",
        studies: [
          "1b9baeb16d2aeba13bed71045df1bc65",
          "02ef8f31ea86a45cfce6eb297c274598",
          "9ab20df7b89dd84716029b777ed7a5b2",
        ],
      },
      {
        case: "case 2 Dolor sit Amet",
        id: "abc456",
        studies: [
          "1b9baeb16d2aeba13bed71045df1bc65",
          "02ef8f31ea86a45cfce6eb297c274598",
          "9ab20df7b89dd84716029b777ed7a5b2",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXJpfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
  },
];
