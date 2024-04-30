export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };