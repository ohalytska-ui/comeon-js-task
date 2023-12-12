import { useEffect, useState } from 'react';
import { HttpMethod } from '../models/HttpMethod';

export const CategoriesList = ({ handleCategoryFilter, setError }) => {
  const [categories, setCategories] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/categories', {
          method: HttpMethod.GET,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          setError('Error fetching data!');
        } else {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        setError(`Error fetching data! ${error.message}`);
      }
    })();
  }, [setError]);

  const handleCategoryClick = (category) => {
    handleCategoryFilter(category);
    setSelectedCategoryId(category.id);
  };

  return (
    <div className="four wide column">
      <h3 className="ui dividing header">Categories</h3>
      <div className="ui selection animated list category items">
        {categories && categories.length ? (
          <>
            {categories.map((category) => (
              <div
                className={`category item ${selectedCategoryId === category.id ? 'active' : ''}`}
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="content">
                  <div className="header">{category.name}</div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};
