import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit}) => {
  return (
    <>  
<form onSubmit={handleSubmit}>
  <div className="mb-3">
      <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter new Category' value={value} onChange={(e) => setValue(e.target.value)} />
     </div>
  
  <button type="submit" style={{color: '#ffffff', height: '33px', width: '80px', textAlign: 'center', padding: '1px'}} className="btn bg-black">Submit</button>
</form>

    </>
  )
}

export default CategoryForm