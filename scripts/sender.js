const contactData = {
    nickname: "",
    address: "",
    phone: ""
}

const nicknameField = document.querySelector("input[name='nickname']");

function writeObjectDataBack() {
    contactData.address = "test value";
    contactData.nickname = nicknameField.value;
}

nicknameField.addEventListener("input", writeObjectDataBack.bind(this));

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitToRabbitMQ.bind(this));



async function submitToRabbitMQ(e) {
    e.preventDefault();

    const response = await fetch("/hello", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(contactData)
    })

    let data = await response.json();

    console.log(data)

    return data;
}