import React from 'react'

const MenuCard = ({ menuData }) => {
    // console.log(menuData);
    return (
        <>
            <section className="main-card-container">
                {menuData.map((curElem) =>{
                    const {id, name, category, image, description} = curElem;
                    return(
                        <>
                            <div className="card-container" key={id}>
                                <div className="card">
                                    <img src={image} alt="images" className="card-media" />
                                    <div className="card-body">
                                        <p className="card-number card-circle subtle">{id}</p>
                                        <p className="card-author subtle">{category}</p>
                                        <h2 className="card-title">{name}</h2>
                                        <span className="card-description subtle">
                                            {description}
                                        </span>
                                        <div className="card-read">Read</div>
                                        <hr/>
                                    </div>
                                    <span className="card-tag subtle">Order Now</span>
                                </div>  
                            </div>
                        </>
                    );   
                })}
            </section>
        </>
    )
}

export default MenuCard
