import React, { useState } from "react";

import {
  Provider,
  defaultTheme,
  ComboBox,
  Section,
  Item,
  Text,
} from "@adobe/react-spectrum";

// a sample return from the search service
const defaultItems = [
  {
    name: "Section One",
    children: [
      { name: "this is the first item" },
      { name: "this is the second item" },
      { name: "this is the third item" },
    ],
  },
];

const App = () => {
  // store items in local state for now; this will eventually be an xstate context
  const [items, setItems] = useState([]);

  // this loading state stuff can be taken right from xstate in a hook;
  // it exists here solely to run the spinner in the right of the input field.
  const [loadingState, setLoadingState] = useState("idle");

  // this is a stand-in for the fetch or axios call to search
  const performSearch = () =>
    setTimeout(() => {
      setItems(defaultItems);
      setLoadingState("idle");
    }, 2000);

  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      setLoadingState("loading");
      performSearch();
    }
  };

  return (
    <div className="App">
      <Provider theme={defaultTheme}>
        <ComboBox
          label="this is a dropdown."
          loadingState={loadingState}
          onOpenChange={handleOpenChange}
          defaultItems={items}
        >
          {({ name, children }) => (
            <Section key={name} items={children} title={name}>
              {(item) => (
                <Item key={item.name} textValue={item.name}>
                  <Text>{item.name}</Text>
                  <Text slot="description">in {name}</Text>
                </Item>
              )}
            </Section>
          )}
        </ComboBox>
      </Provider>
    </div>
  );
};

export default App;
