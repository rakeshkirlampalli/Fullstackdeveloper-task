import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Form.css'
function Form() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='main'>
    <div className='section'>
      <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTgzY2k4YXN0cDJndTJ2dmg5Z2VjZ2R5a3BvODJlbHExdnBncXd3eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9JrkkDoJuU0FbdbUZU/200.gif' alt='Animated-gif'/>
     </div>
    <div className='aside' >
      <form onSubmit={handleSubmit(onSubmit)} className='Form' >
        <div className='name'>
          <label className='label' >Name :</label>
          <input
            type="text" className='input'
            {...register('name', { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className='mobile'>
          <label className='label' >Mobile:</label>
          <input
            type="text" className='input'
            {...register('mobile', {
              required: true,
              pattern: {
                value: /^[0-9+-]+$/,
                message: 'Invalid mobile number',
              },
            })}
          />
          {errors.mobile && <span>{errors.mobile.message}</span>}
        </div>

        <div className='email'>
          <label className='label'  >Email :</label>
          <input
            type="text" className='input'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className='password'>
          <label  className='label' >Password:</label>
          <div className="password-input">
            <input className='input'
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[@#$])(?=.*\d{4})[A-Za-z\d@#$]{9,}$/,
                  message:
                    'Password should contain at least 1 special character, 4 numbers, and be at least 9 characters long.',
                },
              })}
            />
            {/* to see the password visibile FontAwesomeIcon */}
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className='re-password'>
          <label className='label' >Re-enter Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className='input'
            {...register('passwordConfirmation', {
              required: true,
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
           <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          {errors.passwordConfirmation && (
            <span>{errors.passwordConfirmation.message}</span>
          )}
        </div>

        <div className='select'>
          <label className='label' >Location :</label>
          <select {...register('selectField')}>
            <option value="select">Select</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderbad">Hyderbad</option>
            <option value="Mumbai">Mumbai</option>  
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        <div className='gender'>
            <label className='label' >Gender:</label>
          <label>
            <input type="radio" value="Male" {...register('radioField')} />
              Male
          </label>
          <label>
            <input type="radio" value="Female" {...register('radioField')} />
            Female
          </label>
        </div>
        
        <div className='agree'>
          <label>
            <input type="checkbox" {...register('checkboxField')} />
            Agree,  <a href="#" onClick={toggleDetails}>
        {showDetails ? 'terms & conditions' : 'Show Details'}
      </a>
      {showDetails && (
        <div>
          <p>Additional details go here...</p>
        </div>
      )}
          </label>
        </div>
        <button className='button' type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default Form;
