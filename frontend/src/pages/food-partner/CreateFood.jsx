import React, { useState } from 'react' 
import axios from 'axios' 
import '../../styles/create-food.css'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    videoFile: null,
    foodName: '',
    description: ''
  })

  const [videoPreview, setVideoPreview] = useState(null)

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, videoFile: file }))
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const payload = new FormData();

    payload.append('name' , formData.foodName);
    payload.append('description' , formData.description );
   payload.append('video' , formData.videoFile); 

    const response = await axios.post("http://localhost:3000/api/food" , payload , {
      withCredentials: true,
    })

    console.log(response.data);

    navigate("/");

  }

  const handleReset = () => {
    setFormData({ videoFile: null, foodName: '', description: '' })
    setVideoPreview(null)
    // Clean up the object URL
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
  }

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <div className="create-food-header">
          <h1 className="create-food-title">Create Food Item</h1>
          <p className="create-food-sub">Add a new food item to your menu</p>
        </div>

        <form className="create-food-form" onSubmit={handleSubmit}>
          {/* Video Input */}
          <div className="form-field">
            <label>Video</label>
            <div className="video-input-wrapper">
              <label className="video-input-label" htmlFor="video-input">
                <div className="video-input-text">
                  <div className="video-input-icon">📹</div>
                  <div className="video-input-main">Upload Video</div>
                  <div className="video-input-sub">MP4, WebM or OGG (Max 50MB)</div>
                </div>
              </label>
              <input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                required
              />
            </div>
            {videoPreview && (
              <div className="video-preview-container">
                <video
                  className="video-preview-player"
                  src={videoPreview}
                  controls
                  muted
                />
              </div>
            )}
          </div>

          {/* Food Name Input */}
          <div className="form-field">
            <label htmlFor="food-name">Food Name</label>
            <input
              id="food-name"
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleInputChange}
              placeholder="e.g., Margherita Pizza"
              required
            />
            <div className="helper-text">Enter the name of the food item</div>
          </div>

          {/* Description Input */}
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your food item, ingredients, preparation method, etc."
              required
            />
            <div className="helper-text">Provide details about your food item</div>
          </div>

          {/* Actions */}
          <div className="create-food-actions">
            <button type="submit" className="btn btn-primary">
              Create Food Item
            </button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
