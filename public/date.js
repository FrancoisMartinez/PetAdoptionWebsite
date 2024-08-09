document.addEventListener('DOMContentLoaded', () => {

    const getDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute:  'numeric', second: 'numeric' };
        const date = new Date();
        document.getElementById("date").innerText = date.toLocaleTimeString('en-US', options);
      };
      
      
    
    setInterval(getDate, 1000);
    getDate();
});

