const graph = {
    "Bengaluru": {
        "Mysuru": 145,
        "Tumakuru": 70,
        "Kolar": 75,
        "Chitradurga": 200,
        "Mandya": 90,
        "Hassan": 180,
        "Davangere": 265,
        "Bellary": 305,
        "Chikkaballapur": 60
    },
    "Mysuru": {
        "Bengaluru": 145,
        "Mandya": 40,
        "Hassan": 115,
        "Chamarajanagar": 60,
        "Kollegal": 70
    },
    "Tumakuru": {
        "Bengaluru": 70,
        "Chitradurga": 150,
        "Davangere": 200,
        "Hoskote": 40
    },
    "Kolar": {
        "Bengaluru": 75,
        "Malur": 25,
        "Chikkaballapur": 50,
        "Mulbagal": 60
    },
    "Mandya": {
        "Bengaluru": 90,
        "Mysuru": 40,
        "Hassan": 90,
        "Srirangapatna": 20
    },
    "Chitradurga": {
        "Bengaluru": 200,
        "Tumakuru": 150,
        "Davangere": 70,
        "Hampi": 140
    },
    "Hassan": {
        "Bengaluru": 180,
        "Mysuru": 115,
        "Mandya": 90,
        "Arasikere": 35
    },
    "Davangere": {
        "Bengaluru": 265,
        "Tumakuru": 200,
        "Chitradurga": 70,
        "Hubli": 150
    },
    "Bellary": {
        "Bengaluru": 305,
        "Hospet": 40,
        "Hampi": 60
    },
    "Hubli": {
        "Davangere": 150,
        "Dharwad": 20,
        "Gadag": 70,
        "Karwar": 120
    },
    "Dharwad": {
        "Hubli": 20,
        "Gadag": 50,
        "Bagalkot": 100
    },
    "Gadag": {
        "Hubli": 70,
        "Dharwad": 50,
        "Bagalkot": 60
    },
    "Bagalkot": {
        "Dharwad": 100,
        "Gadag": 60,
        "Badami": 40
    },
    "Badami": {
        "Bagalkot": 40,
        "Hospet": 90,
        "Hampi": 70
    },
    "Hospet": {
        "Bellary": 40,
        "Badami": 90,
        "Hampi": 15
    },
    "Hampi": {
        "Bellary": 60,
        "Hospet": 15,
        "Chitradurga": 140
    },
    "Chamarajanagar": {
        "Mysuru": 60,
        "Kollegal": 70
    },
    "Kollegal": {
        "Chamarajanagar": 70,
        "Malavali": 80
    },
    "Malur": {
        "Kolar": 25,
        "Bengaluru": 60
    },
    "Chikkaballapur": {
        "Bengaluru": 60,
        "Nandi Hills": 25
    },
    "Nandi Hills": {
        "Chikkaballapur": 25
    },
    "Srirangapatna": {
        "Mandya": 20,
        "Mysuru": 25
    },
    "Hoskote": {
        "Tumakuru": 40,
        "Bengaluru": 30
    }
};


// Dijkstra's Algorithm
function dijkstra(graph, start, end) {
    const distances = {};
    const visited = new Set();
    const previous = {};
    const queue = [];

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    queue.push(start);

    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const currentNode = queue.shift();

        if (currentNode === end) {
            const path = [];
            let curr = end;
            while (curr) {
                path.unshift(curr);
                curr = previous[curr];
            }
            return { distance: distances[end], path };
        }

        visited.add(currentNode);

        for (const neighbor in graph[currentNode]) {
            if (!visited.has(neighbor)) {
                const newDistance = distances[currentNode] + graph[currentNode][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentNode;
                    queue.push(neighbor);
                }
            }
        }
    }
    return { distance: Infinity, path: [] };
}

// Event listener for the button
document.getElementById('findRoute').addEventListener('click', () => {
    const start = document.getElementById('start').value.trim();
    const end = document.getElementById('end').value.trim();
    const result = dijkstra(graph, start, end);

    if (result.distance === Infinity) {
        document.getElementById('result').innerText = 'No path found!';
    } else {
        document.getElementById('result').innerText = `Shortest path from ${start} to ${end}: ${result.path.join(' -> ')} (Distance: ${result.distance} km)`;
        visualizeGraph(result.path);
    }
});

// Visualization function
function visualizeGraph(path) {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const cityPositions = {
        "Bengaluru": { x: 400, y: 300 },
        "Mysuru": { x: 300, y: 400 },
        "Tumakuru": { x: 490, y: 250 },
        "Kolar": { x: 300, y: 200 },
        "Mandya": { x: 350, y: 350 },
        "Chitradurga": { x: 500, y: 200 },
        "Hassan": { x: 200, y: 300 },
        "Davangere": { x: 500, y: 400 },
        "Bellary": { x: 650, y: 400 },
        "Hubli": { x: 650, y: 250 },
        "Dharwad": { x: 700, y: 200 },
        "Gadag": { x: 750, y: 300 },
        "Bagalkot": { x: 700, y: 400 },
        "Badami": { x: 500, y: 450 },
        "Hospet": { x: 650, y: 480 },
        "Hampi": { x: 600, y: 350 },
        "Chamarajanagar": { x: 200, y: 400 },
        "Kollegal": { x: 100, y: 400 },
        "Malur": { x: 275, y: 250 },
        "Chikkaballapur": { x: 375, y: 225 },
        "Nandi Hills": { x: 400, y: 180 },
        "Srirangapatna": { x: 280, y: 360 },
        "Hoskote": { x: 470, y: 280 },
    };
    

    // Draw all links
    ctx.strokeStyle = '#999';
    for (const source in graph) {
        if (cityPositions[source]) {
            for (const target in graph[source]) {
                if (cityPositions[target]) {
                    const start = cityPositions[source];
                    const end = cityPositions[target];
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(end.x, end.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Draw the path with a different color
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2; // Make the path line thicker
    for (let i = 0; i < path.length - 1; i++) {
        const start = cityPositions[path[i]];
        const end = cityPositions[path[i + 1]];
        if (start && end) {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }

    // Draw nodes and city names
    for (const city in cityPositions) {
        const { x, y } = cityPositions[city];
        ctx.fillStyle = path.includes(city) ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw city name
        ctx.fillStyle = 'black';
        ctx.fillText(city, x - 15, y - 10); // Center the text above the circle
    }
}

// Draw all cities and connections initially
function drawAllCities() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const cityPositions = {
        "Bengaluru": { x: 400, y: 300 },
        "Mysuru": { x: 300, y: 400 },
        "Tumakuru": { x: 490, y: 250 },
        "Kolar": { x: 300, y: 200 },
        "Mandya": { x: 350, y: 350 },
        "Chitradurga": { x: 500, y: 200 },
        "Hassan": { x: 200, y: 300 },
        "Davangere": { x: 500, y: 400 },
        "Bellary": { x: 650, y: 400 },
        "Hubli": { x: 650, y: 250 },
        "Dharwad": { x: 700, y: 200 },
        "Gadag": { x: 750, y: 300 },
        "Bagalkot": { x: 700, y: 400 },
        "Badami": { x: 500, y: 450 },
        "Hospet": { x: 650, y: 480 },
        "Hampi": { x: 600, y: 350 },
        "Chamarajanagar": { x: 200, y: 400 },
        "Kollegal": { x: 100, y: 400 },
        "Malur": { x: 275, y: 250 },
        "Chikkaballapur": { x: 375, y: 225 },
        "Nandi Hills": { x: 400, y: 180 },
        "Srirangapatna": { x: 280, y: 360 },
        "Hoskote": { x: 470, y: 280 },
    };
    

    // Draw all links
    ctx.strokeStyle = '#999';
    for (const source in graph) {
        if (cityPositions[source]) {
            for (const target in graph[source]) {
                if (cityPositions[target]) {
                    const start = cityPositions[source];
                    const end = cityPositions[target];
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(end.x, end.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Draw nodes and city names
    for (const city in cityPositions) {
        const { x, y } = cityPositions[city];
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw city name
        ctx.fillStyle = 'black';
        ctx.fillText(city, x - 15, y - 10); // Center the text above the circle
    }
}

// Initialize the canvas with all cities
drawAllCities();
