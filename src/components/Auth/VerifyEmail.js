import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/auth';

const VerifyEmail = () => {
  const [status, setStatus] = useState('Verifying...');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('Email verified successfully!');
        setTimeout(() => navigate('/login'), 3000); 
      } catch (error) {
        setStatus('Verification failed. Please try again.');
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;