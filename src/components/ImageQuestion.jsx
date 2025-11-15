function ImageQuestion({ imageUrl }) {
	return (
		<div className="image-container">
			<img 
				src={imageUrl} 
				alt="Máquina Makita" 
				className="question-image"
			/>
		</div>
	)
}

export default ImageQuestion