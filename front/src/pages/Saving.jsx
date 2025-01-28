import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { History } from 'lucide-react';
import { LoadingState } from '../components/Loeding.jsx';
import { ErrorState } from '../components/Error.jsx';
import { HistoryItem } from '../components/HistoryItem.jsx';
import { EmptyState } from '../components/Emplty.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from "./imagesPages/delete.png"
import axios from 'axios';

const Saving = ({ darkMode }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useOutletContext();
  const id = user._id;

  // Function to handle the correction download
  const handleDownload = async (correctionId) => {
    try {
      const response = await fetch('http://localhost:2000/api/app/telecharger-correction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: id, correction_id: correctionId }),
      });

      if (response.ok) {
        // Trigger the file download
        const fileBlob = await response.blob();
        const fileURL = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `${correctionId}.txt`; // Set the file name here
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Show success toast
        toast.success('Correction downloaded successfully!');
      } else {
        const data = await response.json();

        // Show error toast with server message
        toast.error(data.message || 'Failed to download correction.');
      }
    } catch (error) {
      console.error('Error downloading correction:', error);

      // Show generic error toast
      toast.error('An error occurred while downloading the correction.');
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:2000/api/app/Historique', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: id }),
        });

        const data = await response.json();

        if (response.ok) {
          setHistory(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id]);
  const HandleDelete = async (SavedId) => {
    try {
      const response = await axios.delete(`http://localhost:2000/api/app/delete/${SavedId}`);
      if (response.status === 200) {
        setHistory(history.filter(item => item._id !== SavedId));
        toast.success("Correction deleted successfully");
      } else {
        toast.error("Failed to delete correction");
      }
    } catch (err) {
      toast.error('Error deleting correction:', err);
    }
  };

  if (loading) return <LoadingState darkMode={darkMode} />;
  if (error) return <ErrorState error={error} darkMode={darkMode} />;

  return (
   <>
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-2xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <History className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Saving History
            </h1>
          </div>

          <div className="space-y-4">
          {history.length > 0 ? (
  history.map((item) => (
    <div key={item._id} className="flex justify-between items-center">
      <HistoryItem item={item} darkMode={darkMode} />
      <div className="flex gap-3">
        <button
          onClick={() => HandleDelete(item._id)}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <img src={DeleteIcon} alt="Delete" className="w-4 h-4 mr-2" />
          Delete
        </button>
        <button
          onClick={() => handleDownload(item._id)}
          className="text-blue-500 hover:text-blue-700"
        >
          Download Correction
        </button>
      </div>
    </div>
  ))
) : (
  <EmptyState darkMode={darkMode} />
)}
          </div>
        </div>
      </div>
    </div>
       <ToastContainer
       position="bottom-left"
       autoClose={3000}
       hideProgressBar={true}
       closeOnClick
       pauseOnHover
       draggable
       theme={darkMode ? "dark" : "light"}
     />
   </>
  );
};

export default Saving;
