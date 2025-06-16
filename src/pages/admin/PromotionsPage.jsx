import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Button from '../../components/common/Button';
import Promotion from "../../../service/gatewayApi.ts";
import { getAllPromotions } from "../../../service/gatewayApi.ts"; 

const PromotionsPage = () => {
  //Defines the base promotions to be fetch from the DB
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState(promotions);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPromotion, setShowAddPromotion] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    description: '',
    type: 'percentage',
    discountValue: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd'),
    applicableRooms: 'all',
    applicableRoomIds: [],
    minStay: 1,
  });
  //Fetches the data
  useEffect(() =>{
    const fetchPromotions = async() =>{
      try {
        const data = await Promotion.getAllPromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to load promotions", error);

      }
    }
  }, []);

  filteredPromotions = promotions;
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    let filtered = promotions;
    
    // Filter by search term
    if (value) {
      filtered = filtered.filter(promo => 
        promo.name.toLowerCase().includes(value.toLowerCase()) ||
        promo.description.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(promo => promo.isActive === filter);
    }
    
    setFilteredPromotions(filtered);
  };
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    
    let filtered = promotions;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(promo => 
        promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (newFilter !== 'all') {
      filtered = filtered.filter(promo => promo.isActive === newFilter);
    }
    
    setFilteredPromotions(filtered);
  };
  
  const handleToggleStatus = (id) => {
    // Toggle promotion status
    const updatedPromotions = filteredPromotions.map(promo => {
      if (promo.promotionId === id) {
        return {
          ...promo,
          status: promo.isActive === true ? false : true
        };
      }
      return promo;
    });
    
    setFilteredPromotions(updatedPromotions);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion({
      ...newPromotion,
      [name]: value
    });
  };
  
  const handleRoomSelectionChange = (roomId) => {
    const currentIds = [...newPromotion.applicableRoomIds];
    const index = currentIds.indexOf(roomId);
    
    if (index === -1) {
      currentIds.push(roomId);
    } else {
      currentIds.splice(index, 1);
    }
    
    setNewPromotion({
      ...newPromotion,
      applicableRoomIds: currentIds
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newPromotion.title || !newPromotion.description || !newPromotion.startDate || !newPromotion.endDate) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // For demo purposes, just close the form
    alert('Promotion added successfully!');
    setShowAddPromotion(false);
  };

  const promotionsStyles = {
    pageTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1E3A8A',
      marginBottom: '2rem',
    },
    topBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: 1,
    },
    searchInput: {
      flex: 1,
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      fontSize: '0.95rem',
      maxWidth: '400px',
    },
    filtersContainer: {
      display: 'flex',
      gap: '0.5rem',
    },
    filterButton: {
      backgroundColor: 'transparent',
      border: '1px solid #1E3A8A',
      color: '#1E3A8A',
      padding: '0.5rem 1rem',
      borderRadius: '30px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeFilterButton: {
      backgroundColor: '#1E3A8A',
      color: '#ffffff',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '800px',
    },
    tableHeader: {
      backgroundColor: '#f9f9f9',
      padding: '1rem',
      textAlign: 'left',
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#333333',
      borderBottom: '1px solid #e0e0e0',
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '0.95rem',
      color: '#333333',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '30px',
      fontSize: '0.75rem',
      fontWeight: 600,
    },
    statusActive: {
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      color: '#05965A',
    },
    statusInactive: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#EF4444',
    },
    actionButtonsContainer: {
      display: 'flex',
      gap: '0.5rem',
    },
    actionButton: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.8rem',
      backgroundColor: 'transparent',
      border: '1px solid',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    noResults: {
      padding: '2rem',
      textAlign: 'center',
      color: '#666666',
    },
    addPromotionCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
    },
    formTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1E3A8A',
      marginBottom: '1.5rem',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    formLabel: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
      color: '#333333',
    },
    formInput: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '0.95rem',
    },
    formTextarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '0.95rem',
      minHeight: '120px',
      resize: 'vertical',
    },
    formSelect: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '0.95rem',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 0.75rem center',
      backgroundSize: '1rem',
    },
    formCheckboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    formCheckbox: {
      width: '18px',
      height: '18px',
    },
    roomsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '1rem',
    },
    roomCheckboxLabel: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      fontSize: '0.9rem',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '2rem',
    },
  };

  return (
    <div>
      <div style={promotionsStyles.topBar}>
        <h1 style={promotionsStyles.pageTitle}>Promotions & Discounts</h1>
        
        <Button primary onClick={() => setShowAddPromotion(!showAddPromotion)}>
          {showAddPromotion ? 'Cancel' : 'Add New Promotion'}
        </Button>
      </div>
      
      {showAddPromotion && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={promotionsStyles.addPromotionCard}
        >
          <h2 style={promotionsStyles.formTitle}>Create New Promotion</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={promotionsStyles.formGrid}>
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>Promotion Title *</label>
                <input 
                  type="text" 
                  name="title"
                  style={promotionsStyles.formInput}
                  value={newPromotion.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>Discount Type *</label>
                <select 
                  name="discountType"
                  style={promotionsStyles.formSelect}
                  value={newPromotion.discountType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">Percentage Off</option>
                  <option value="fixed">Fixed Amount Off</option>
                  <option value="value_added">Value Added (No direct discount)</option>
                </select>
              </div>
              
              {newPromotion.discountType !== 'value_added' && (
                <div style={promotionsStyles.formGroup}>
                  <label style={promotionsStyles.formLabel}>
                    {newPromotion.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount ($)'}
                  </label>
                  <input 
                    type="number" 
                    name="discountValue"
                    style={promotionsStyles.formInput}
                    value={newPromotion.discountValue}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              )}
              
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>Start Date *</label>
                <input 
                  type="date" 
                  name="startDate"
                  style={promotionsStyles.formInput}
                  value={newPromotion.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>End Date *</label>
                <input 
                  type="date" 
                  name="endDate"
                  style={promotionsStyles.formInput}
                  value={newPromotion.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>Minimum Stay (Nights)</label>
                <input 
                  type="number" 
                  name="minStay"
                  style={promotionsStyles.formInput}
                  value={newPromotion.minStay}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              
              <div style={promotionsStyles.formGroup}>
                <label style={promotionsStyles.formLabel}>Status</label>
                <select 
                  name="status"
                  style={promotionsStyles.formSelect}
                  value={newPromotion.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div style={promotionsStyles.formGroup}>
              <label style={promotionsStyles.formLabel}>Description *</label>
              <textarea 
                name="description"
                style={promotionsStyles.formTextarea}
                value={newPromotion.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <div style={promotionsStyles.formGroup}>
              <label style={promotionsStyles.formLabel}>Applicable Rooms</label>
              <div>
                <div style={promotionsStyles.formCheckboxContainer}>
                  <input 
                    type="radio" 
                    id="allRooms"
                    name="applicableRooms"
                    value="all"
                    checked={newPromotion.applicableRooms === 'all'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="allRooms">All Rooms</label>
                </div>
                
                <div style={promotionsStyles.formCheckboxContainer}>
                  <input 
                    type="radio" 
                    id="selectedRooms"
                    name="applicableRooms"
                    value="selected"
                    checked={newPromotion.applicableRooms === 'selected'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="selectedRooms">Selected Rooms Only</label>
                </div>
                
                {newPromotion.applicableRooms === 'selected' && (
                  <div style={promotionsStyles.roomsGrid}>
                    {rooms.map(room => (
                      <label 
                        key={room.id} 
                        style={promotionsStyles.roomCheckboxLabel}
                      >
                        <input 
                          type="checkbox" 
                          checked={newPromotion.applicableRoomIds.includes(room.id)}
                          onChange={() => handleRoomSelectionChange(room.id)}
                        />
                        {room.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div style={promotionsStyles.buttonContainer}>
              <Button outline onClick={() => setShowAddPromotion(false)}>
                Cancel
              </Button>
              <Button primary type="submit">
                Save Promotion
              </Button>
            </div>
          </form>
        </motion.div>
      )}
      
      <div style={promotionsStyles.topBar}>
        <div style={promotionsStyles.searchContainer}>
          <input
            type="text"
            placeholder="Search promotions..."
            style={promotionsStyles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div style={promotionsStyles.filtersContainer}>
          <button 
            style={{
              ...promotionsStyles.filterButton,
              ...(filter === 'all' ? promotionsStyles.activeFilterButton : {})
            }}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            style={{
              ...promotionsStyles.filterButton,
              ...(filter === 'active' ? promotionsStyles.activeFilterButton : {})
            }}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button 
            style={{
              ...promotionsStyles.filterButton,
              ...(filter === 'inactive' ? promotionsStyles.activeFilterButton : {})
            }}
            onClick={() => handleFilterChange('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={promotionsStyles.card}
      >
        {filteredPromotions.length > 0 ? (
          <table style={promotionsStyles.table}>
            <thead>
              <tr>
                <th style={promotionsStyles.tableHeader}>Title</th>
                <th style={promotionsStyles.tableHeader}>Discount</th>
                <th style={promotionsStyles.tableHeader}>Period</th>
                <th style={promotionsStyles.tableHeader}>Minimum Stay</th>
                <th style={promotionsStyles.tableHeader}>Applicable Rooms</th>
                <th style={promotionsStyles.tableHeader}>Status</th>
                <th style={promotionsStyles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promo) => (
                <tr key={promo.promotionId}>
                  <td style={promotionsStyles.tableCell}>
                    <div style={{ fontWeight: 600 }}>{promo.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666666' }}>{promo.description.substring(0, 60)}...</div>
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    {promo.discountType === 'percentage' ? `${promo.discountValue}% off` :
                     promo.discountType === 'fixed' ? `$${promo.discountValue} off` :
                     'Value added'}
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    {format(promo.startDate, 'MMM dd, yyyy')} - {format(promo.endDate, 'MMM dd, yyyy')}
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    {promo.minStay} {promo.minStay === 1 ? 'night' : 'nights'}
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    {promo.applicableRooms === 'all' ? 'All rooms' : `${promo.applicableRoomIds?.length || 0} rooms`}
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    <span 
                      style={{
                        ...promotionsStyles.statusBadge,
                        ...(promo.isActive === true ? promotionsStyles.isActive : promotionsStyles.statusInactive)
                      }}
                    >
                      {promo.isActive.charAt(0).toUpperCase() + promo.isActive.slice(1)}
                    </span>
                  </td>
                  <td style={promotionsStyles.tableCell}>
                    <div style={promotionsStyles.actionButtonsContainer}>
                      <button 
                        style={{
                          ...promotionsStyles.actionButton,
                          borderColor: '#1E3A8A',
                          color: '#1E3A8A',
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        style={{
                          ...promotionsStyles.actionButton,
                          borderColor: promo.isActive === true ? '#EF4444' : '#05965A',
                          color: promo.isActive === true ? '#EF4444' : '#05965A',
                        }}
                        onClick={() => handleToggleStatus(promo.promotionId)}
                      >
                        {promo.isActive === true ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={promotionsStyles.noResults}>
            No promotions found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PromotionsPage;
