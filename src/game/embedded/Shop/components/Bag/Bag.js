import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';

import { useImagesContext } from '../../../../contexts/ImagesContext';

import { Rules, Task, Container } from './styles';
import { Button } from '../../../../../common/styles';
import { DropTarget } from 'react-drag-drop-container';

export default props => {
  const { productsToBuy, status, selectedIndex, reset } = props;
  const { images } = useImagesContext();
  const [listOfDroppedItems, setlistOfDroppedItems] = useState([]);

  const propsSelected = useSpring({
    from: { transform: 'scale(1)' },
    to: [{ transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
  });

  function dragEnter(ev) {
    console.log("****drag enter called***")
    // ev.dataTransfer.dropEffect = this.props.dropEffect;
  }

  function dragLeave(ev) {
    console.log("****drag leave called***")
    // ev.dataTransfer.dropEffect = this.props.dropEffect;
  }

  function onHit(ev) {
    console.log("***onhit called*****")
    const currentElement = {
      image: ev.dragData,
      index: ev.target.parentElement.id,
    }

    const element = <img src={ev.dragData} />;
    ReactDOM.render(element, document.getElementById(ev.target.parentElement.id));

    const list = [...listOfDroppedItems, currentElement];
    setlistOfDroppedItems(list)
  }

  function drop(ev) {
    // var dragItem = ev.dataTransfer.getData("drag-item");
    console.log("***drop called*****", ev)
  }

  return (
    <Container>
      {status !== 'playing' && (
        <Rules>
          {status === 'win' && <>Well done!</>}
          {status === 'fail' && 'Try one more time!'}
          {!status && 'Click on the logo and match them with their creators in 25 seconds!'}
          <Button onClick={reset}>New game!</Button>
        </Rules>
      )}

      <Task>
        {productsToBuy.map((item, i) => (
          <animated.div
            key={`p${i}`}
            className={`item ${item.selected ? null : 'gray'}`}
            style={item.selected && selectedIndex === i ? propsSelected : null}
          >
            <DropTarget
              targetKey="foo"
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onHit={onHit}
            >
              <div id={i}>
                <img src={images[item.name + '.png']} alt={item.name} />
              </div>
            </DropTarget>
          </animated.div>
        ))}
      </Task>
    </Container>
  );
};
