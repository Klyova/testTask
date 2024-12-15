document.addEventListener("DOMContentLoaded", (event) => {

    document.querySelectorAll(".form__field-bordered input").forEach((input) => {
        input.addEventListener("focus", function () {
            this.closest(".form__field-bordered").classList.add("active");
        });

        input.addEventListener("blur", function () {
            if (this.value.length === 0) {
                this.closest(".form__field-bordered").classList.remove("active");
            }
        });
    });

    function hideError(field) {
        const errorBlock = document.querySelector(`#error-${field}`);
        if (errorBlock) {
            errorBlock.style.display = "none";
        }
    }

    function displayError(field, message) {
        const errorBlock = document.querySelector(`#error-${field}`);
        if (errorBlock) {
            errorBlock.textContent = message;
            errorBlock.style.display = "block";
        }
    }

    document.querySelectorAll("#emailaddress, #password, #confirmpass").forEach((input) => {
        input.addEventListener("focus", () => {
            hideError(input.id);
        });
    });

    async function checkEmailExists(email) {
        const response = await fetch("/check-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const errorData = await response.json();
            displayError("emailaddress", errorData.error);
            return false;
        }
        return true;
    }

    async function sendData() {
        const dataForm = {
            email: document.getElementById("emailaddress").value,
            password: document.getElementById("password").value,
            confirmpass: document.getElementById("confirmpass").value,
        }

        const isEmailAvailable = await checkEmailExists(dataForm.email);
        if (!isEmailAvailable) {
            return;
        }

        try {
            const response = await fetch("/form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForm)
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.errors) {
                    if (errorData.errors.email) {
                        displayError("emailaddress", errorData.errors.email);
                    }
                    if (errorData.errors.password) {
                        displayError("password", errorData.errors.password);
                    }
                    if (errorData.errors.confirmpass) {
                        displayError("confirmpass", errorData.errors.confirmpass);
                    }
                }
                return;
            }

            const result = await response.json();

            hideError("emailaddress");
            hideError("password");
            hideError("confirmpass");

            if (result.success) {
                localStorage.setItem("jwt", result.token);

                document.getElementById("form__email-display").style.display = "flex";
                document.getElementById("form__email-display").textContent = `Дякуємо ${result.data.email}`;
                document.getElementsByClassName("form__container")[0].style.display = "none";
            } else {
                console.error(result.message);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const formButton = document.querySelector('.form__button');

    if (formButton) {
        formButton.addEventListener('click', sendData);
    }

});
