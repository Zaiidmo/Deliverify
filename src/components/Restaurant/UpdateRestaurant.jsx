import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import FormInput from '../../components/Restaurant/Layouts/FormInput';
import Button from '../../components/Restaurant/Layouts/Button';
import Alert from '../../components/ui/Alert';
import { AlertCircle } from 'lucide-react';

const UpdateRestaurant = ({ onUpdateRestaurant, onClose, restaurantToUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    openAt: '',
    closeAt: '',
    latitude: '',
    longitude: '',
    category: {
      name: '',
      description: ''
    },
    logo: null,
    cover: null,
    images: []
  });

  const [previewUrls, setPreviewUrls] = useState({
    logo: null,
    cover: null,
    images: []
  });

  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (restaurantToUpdate) {
      setFormData({
        name: restaurantToUpdate.name || '',
        address: restaurantToUpdate.address || '',
        phoneNumber: restaurantToUpdate.phoneNumber || '',
        openAt: restaurantToUpdate.openAt || '',
        closeAt: restaurantToUpdate.closeAt || '',
        latitude: restaurantToUpdate.location?.coordinates[1] || '',
        longitude: restaurantToUpdate.location?.coordinates[0] || '',
        category: {
          name: restaurantToUpdate.category?.name || '',
          description: restaurantToUpdate.category?.description || ''
        },
        logo: restaurantToUpdate.logo || null,
        cover: restaurantToUpdate.cover || null,
        images: restaurantToUpdate.images || []
      });

      setPreviewUrls({
        logo: restaurantToUpdate.logo || null,
        cover: restaurantToUpdate.cover || null,
        images: restaurantToUpdate.images || []
      });
    }
  }, [restaurantToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      category: { ...prev.category, [name]: value }
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const newFiles = files.length > 0 ? (name === 'images' ? Array.from(files) : files[0]) : null;

    setFormData(prev => ({
      ...prev,
      [name]: newFiles
    }));

    if (newFiles) {
      if (name === 'images') {
        setPreviewUrls(prev => ({
          ...prev,
          images: Array.from(files).map(file => URL.createObjectURL(file))
        }));
      } else {
        setPreviewUrls(prev => ({
          ...prev,
          [name]: URL.createObjectURL(newFiles)
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    setLoading(true);
    const dataToSubmit = new FormData();

    dataToSubmit.append('name', formData.name);
    dataToSubmit.append('address', formData.address);
    dataToSubmit.append('phoneNumber', formData.phoneNumber);
    dataToSubmit.append('openAt', formData.openAt);
    dataToSubmit.append('closeAt', formData.closeAt);
    dataToSubmit.append('location[type]', 'Point');
    dataToSubmit.append('location[coordinates][]', parseFloat(formData.longitude));
    dataToSubmit.append('location[coordinates][]', parseFloat(formData.latitude));
    dataToSubmit.append('category[name]', formData.category.name);
    dataToSubmit.append('category[description]', formData.category.description);

    if (formData.logo) dataToSubmit.append('logo', formData.logo);
    if (formData.cover) dataToSubmit.append('cover', formData.cover);
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(image => dataToSubmit.append('images[]', image));
    }

    try {
      await onUpdateRestaurant(restaurantToUpdate._id, dataToSubmit);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-restaurant-form">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Nom du restaurant"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nom du restaurant"
        />
        <FormInput
          label="Adresse"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Adresse"
        />
        <FormInput
          label="Numéro de téléphone"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Numéro de téléphone"
        />
        <FormInput
          label="Nom de la catégorie"
          name="name"
          value={formData.category.name}
          onChange={handleCategoryChange}
          placeholder="Nom de la catégorie"
        />
        <FormInput
          label="Description de la catégorie"
          name="description"
          value={formData.category.description}
          onChange={handleCategoryChange}
          placeholder="Description de la catégorie"
        />
        <FormInput
          label="Logo"
          name="logo"
          type="file"
          onChange={handleFileChange}
        />
        <FormInput
          label="Image de couverture"
          name="cover"
          type="file"
          onChange={handleFileChange}
        />
        <FormInput
          label="Images supplémentaires"
          name="images"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <Button type="submit" loading={loading}>Mettre à jour le restaurant</Button>
      </form>
    </div>
  );
};

UpdateRestaurant.propTypes = {
  onUpdateRestaurant: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  restaurantToUpdate: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    openAt: PropTypes.string.isRequired,
    closeAt: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    logo: PropTypes.string,
    cover: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  })
};

export default UpdateRestaurant;
