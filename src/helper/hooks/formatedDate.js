export function formatDate(dateString) {
    if (!dateString) {
      return '---';
    }
    
    // Handle Date objects
    let dateStr = dateString;
    if (dateString instanceof Date) {
      dateStr = dateString.toISOString().split('T')[0];
    }
    
    // Handle string dates
    if (typeof dateStr === 'string') {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        // Ensure DD-MM-YYYY format
        return `${day}-${month}-${year}`;
      }
    }
    
    return 'Invalid Date';
  }