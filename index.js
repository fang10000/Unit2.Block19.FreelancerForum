document.addEventListener("DOMContentLoaded", function () {
  
// Define the initial freelancer list based on the workshop example
    let initialFreelancerList = [
    {
      name: "Alice",
      occupation: "Writer",
      startingPrice: 30,
    },
    {
      name: "Bob",
      occupation: "Teacher",
      startingPrice: 50,
    },
    {
      name: "Carol",
      occupation: "Programmer",
      startingPrice: 70,
    },
  ];

  // Access the <tbody> element in the HTML table
  const tableBody = document.querySelector("#freelancerTable tbody");
  let count = 0;  //Used later to break out of the Faker loop which generates new random freelancers one at a time
  let totalStartingPrice = 0;  //Used to store the total price when initial freelancer list is populated and when the list is updated

    // Function to create table rows for a freelancer
    function addFreelancerToTable(freelancer) {
        const row = document.createElement("tr");
    
        const nameCell = document.createElement("td");
        nameCell.textContent = freelancer.name;
        row.appendChild(nameCell);
    
        const occupationCell = document.createElement("td");
        occupationCell.textContent = freelancer.occupation;
        row.appendChild(occupationCell);
    
        const priceCell = document.createElement("td");
        priceCell.textContent = freelancer.startingPrice;
        row.appendChild(priceCell);
    
        tableBody.appendChild(row);
        
        totalStartingPrice += freelancer.startingPrice;
        updateAveragePrice();
      }
    
      // Add initial freelancers to the table
      initialFreelancerList.forEach((freelancer) => {
        addFreelancerToTable(freelancer);
      });

  function generateNewName() {
    if (count < 5) {
      const newFreelancer = {
        name: faker.name.firstName(),
        occupation: faker.name.jobTitle(),
        startingPrice: faker.random.number({ min: 10, max: 300 }) 
      };

    addFreelancerToTable(newFreelancer);  
    count++;

      if (count === 5) {
        clearInterval(interval); // Stop the interval after generating 10 names
      }
    }
  }

  const interval = setInterval(generateNewName, 2000);

  function updateAveragePrice() {
    const totalFreelancers = initialFreelancerList.length + count;
    const averagePrice = totalStartingPrice / totalFreelancers;

    const averagePriceDisplay = document.getElementById("averagePrice");
    averagePriceDisplay.textContent = `The average starting price is: $${averagePrice.toFixed(2)}`;
  }
  
});
