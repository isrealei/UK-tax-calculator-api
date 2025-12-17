import React from 'react'
import "./CalculatorUi.css"

const FormComponent = (props) => {
    return (
        <>
            <label className='form-label'>{props.title}</label>
            {
                props.type === "select" ?
                    <select className='form-input' name={props.name} value={props.value} onChange={props.handleChange}>
                        {
                            props.options.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                    :
                    <input placeholder={props.placeholder} onChange={props.handleChange} className="form-input" value={props.value} type={props.type} name={props.name} />
            }
        </>
    )
}



const SubmittBtn = ({ handleClick, name }) => {
    return (
        <button onClick={handleClick} className='submit-btn' type='submit'>{name}</button>
    )
}
const CalculatorUi = () => {

    const [input, setInput] = React.useState({
        salary_input: "",
        county: "",
        job_title: "",
        salary_period: ""
    });
    const [submitted, setSubmitted] = React.useState(false);
    const [results, setResults] = React.useState(null)

    const handleChange = (event) => {
        setInput((prev) => {
            const { name, value } = event.target
            return {
                ...prev,
                [name]: value
            }

        })
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3005/calc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            if (!response.ok) {
                throw new Error("Failed to Calculate tax")
            };
            const data = await response.json();
            // store backend result
            setResults(data);
            // display result page
            setSubmitted(true);
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    // Conditional Rendering 
    if (submitted && results) {
        return (
            <div className="result-container">

                <h1>Your Tax Calculation</h1>

                <p><strong>Annual Salary:</strong> £{results.annualSalary}</p>
                {/* <p><strong>Personal Allowance:</strong> £{results.personalAllowance}</p> */}
                <p><strong>Taxable Income:</strong> £{results.taxableIncome}</p>

                <p><strong>Income Tax Owed:</strong> £{results.taxOwed}</p>
                <p><strong>National Insurance Owed:</strong> £{results.niOwed}</p>

                <p><strong>Total Deductions:</strong> £{results.totalDeduction}</p>
                <p><strong>Take Home Pay:</strong> £{results.takeHome}</p>

                <button className="back-btn" onClick={() => {
                    // This will rest the results and input value and also update the this state.
                    setSubmitted(false);
                    setResults(null)
                    setInput({
                        salary_input: "",
                        county: "",
                        job_title: "",
                        salary_period: ""
                    });
                }}>
                    Go Back
                </button>
            </div>
        );
    }
    return (
        <div className='form-container'>
            <h1> {input.salary_input} {input.county} {input.job_title} {input.salary_period}  </h1>
            <form className='calc-form'>
                <FormComponent
                    title="Enter Salary"
                    type="number"
                    name="salary_input"
                    handleChange={handleChange}
                    value={input.salary_input}
                    placeholder="£50,000"

                />
                <FormComponent
                    title="Enter county"
                    type="text"
                    name="county"
                    handleChange={handleChange}
                    value={input.county}
                    placeholder="Hamshire"
                />
                <FormComponent
                    title="Enter job title"
                    type="text"
                    name="job_title"
                    handleChange={handleChange}
                    value={input.job_title}
                    placeholder="Software Engineer"
                />
                <FormComponent
                    title="Enter Salary Period"
                    type="select"
                    name="salary_period"
                    handleChange={handleChange}
                    value={input.salary_period}
                    // placeholder="annual/monthly/weekly/daily"
                    options={[
                        { value: "", label: "-- Select Period --" },
                        { value: "annual", label: "Annual" },
                        { value: "monthly", label: "Monthly" },
                        { value: "weekly", label: "Weekly" },
                        { value: "daily", label: "Daily" },
                    ]}

                />
                <SubmittBtn name="Calculate Take Home" handleClick={handleClick} />

            </form>
        </div>
    )
}

export default CalculatorUi
