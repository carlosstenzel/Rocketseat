import React , {useState, useEffect}from 'react'


function DevForm({onSubmit}) {
    const [latitude, setLatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('')


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( (position) =>{
          
          const {latitude, longitude}= position.coords
          setLatitude(latitude)
          setlongitude(longitude)
          
        }, (err)=>{
          console.log(err)
        }, 
        {
          timeout:30000
        })
      }, [])

      async function handleSubmit(e) {
        e.preventDefault()
        await onSubmit( {
            github_username,
            techs,
            longitude,
            latitude
          })
        setTechs('')
        setGithub_username('')
      }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuario do Github</label>
            <input 
            name="github_username" 
            id="git" 
            required
            value= {github_username}
            onChange={e=>{setGithub_username(e.target.value)}} />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Technologies</label>
            <input 
            name="techs" 
            id="techs" 
            required
            value={techs}
            onChange={e=>{setTechs(e.target.value)}} />
          </div>

          <div className="input-group">
            
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              name="latitude"
              id="latitude"
              required 
              value = {latitude}
              onChange={e=>{ setLatitude(e.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="Longitude">Longitude</label>
              <input               
              name="Longitude" 
              id="Longitude" 
              required 
              value= {longitude}
              onChange={e=>{ setlongitude(e.target.value)}}  />
            </div>
            
          </div>
          <button type="submit">Salvar</button>
        </form>
    )
}
export default DevForm