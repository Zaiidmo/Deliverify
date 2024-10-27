import React, { useState } from 'react';
import Card from '../../components/ui/Card'; 
import CardContent from '../../components/ui/CardContent';
import CardHeader from '../../components/ui/CardHeader'; 
import CardTitle from '../../components/ui/CardTitle';
import Button from '../../components/Restaurant/Layouts/Button';
import FormInput from '../../components/Restaurant/Layouts/FormInput';
import Alert from '../../components/ui/Alert';
import { AlertCircle } from 'lucide-react';

const AddRestaurant = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      category: { ...prev.category, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'images' ? Array.from(files) : files[0],
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name) errors.push('Le nom est requis');
    if (!formData.address) errors.push("L'adresse est requise");
    if (!formData.phoneNumber) errors.push('Le numéro de téléphone est requis');
    if (!formData.openAt) errors.push("L'heure d'ouverture est requise");
    if (!formData.closeAt) errors.push("L'heure de fermeture est requise");
    if (!formData.category.name) errors.push('Le nom de la catégorie est requis');
    if (!formData.category.description) errors.push('La description de la catégorie est requise');
    if (!formData.latitude || !formData.longitude) errors.push('Les coordonnées de localisation sont requises');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }
    setLoading(true);

    const dataToSubmit = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
        },
      };
    
    try {
    await onSuccess(dataToSubmit); 
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Ajouter un nouveau restaurant</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </Alert>
          )}
          <FormInput
            label="Nom du restaurant"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Le Petit Bistrot"
          />
          <FormInput
            label="Adresse"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 rue de la Paix"
          />
          <FormInput
            label="Numéro de téléphone"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="0123456789"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Heure d'ouverture"
              id="openAt"
              name="openAt"
              type="time"
              value={formData.openAt}
              onChange={handleInputChange}
            />
            <FormInput
              label="Heure de fermeture"
              id="closeAt"
              name="closeAt"
              type="time"
              value={formData.closeAt}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Latitude"
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="48.8566"
            />
            <FormInput
              label="Longitude"
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="2.3522"
            />
          </div>
          <FormInput
            label="Nom de la catégorie"
            id="categoryName"
            name="name"
            value={formData.category.name}
            onChange={handleCategoryChange}
            placeholder="Ex : Italien"
          />
          <FormInput
            label="Description de la catégorie"
            id="categoryDescription"
            name="description"
            value={formData.category.description}
            onChange={handleCategoryChange}
            placeholder="Cuisine italienne authentique"
          />
          <FormInput
            label="Logo"
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FormInput
            label="Image de couverture"
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FormInput
            label="Images additionnelles"
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <Button type="submit" loading={loading}>
            Ajouter le restaurant
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRestaurant;
