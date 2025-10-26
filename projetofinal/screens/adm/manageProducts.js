import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../components/dataContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/controller";
import { useNotification } from "../../components/notif";

export default function ManageProducts() {
  const [search, setSearch] = useState("");
  const [localProducts, setProducts] = useState([]);
  const { products } = useContext(DataContext);
  const { showNotif } = useNotification();

  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    setProducts(products);
  }, [products]);

  async function remove(item) {
    Alert.alert(
      "Confirmar remoção",
      `Tem certeza que deseja remover o produto "${item.name}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "products", item.id));
              showNotif("Produto removido com sucesso!", "success");
            } catch (error) {
              showNotif("Erro ao remover produto!", "error");
            }
          },
        },
      ]
    );
  }

  function startEdit(item) {
    setEditing(item.id);
    setEditData({
      name: item.name,
      price: String(item.price),
      description: item.description || "",
      image: item.image || "",
    });
  }

  async function saveEdit(id) {
    try {
      await updateDoc(doc(db, "products", id), {
        name: editData.name.trim(),
        description: editData.description.trim(),
        price: parseFloat(editData.price),
        image: editData.image.trim(),
      });
      showNotif("Produto atualizado com sucesso!", "success");
      setEditing(null);
    } catch (error) {
      console.error(error);
      showNotif("Erro ao editar produto!", "error");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>EDITAR PRODUTO</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputsearch}
            placeholder="Pesquisar..."
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
          />
          <Image
            source={require("../../assets/lupinha.png")}
            style={styles.icon}
          />
        </View>

        <FlatList
          data={localProducts.filter((item) =>
            item.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                search
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum produto encontrado</Text>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productcontainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R${Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>

                <View style={{ flexDirection: "collumn", gap: 15 }}>
                  <TouchableOpacity onPress={() => startEdit(item)}>
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => remove(item)}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={24}
                      color="#c0392b"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {editing === item.id && (
                <View style={{ marginTop: 10 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do produto"
                    value={editData.name}
                    onChangeText={(text) =>
                      setEditData((prev) => ({ ...prev, name: text }))
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    keyboardType="numeric"
                    value={editData.price}
                    onChangeText={(text) =>
                      setEditData((prev) => ({ ...prev, price: text }))
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={editData.description}
                    multiline={true}
                    onChangeText={(text) =>
                      setEditData((prev) => ({ ...prev, description: text }))
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="URL da imagem"
                    value={editData.image}
                    onChangeText={(text) =>
                      setEditData((prev) => ({ ...prev, image: text }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveEdit(item.id)}
                  >
                    <Text style={styles.saveText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eddaba",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 8,
  },
  inputsearch: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  productcontainer: {
    backgroundColor: "#dbb795",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    height: 85,
    width: 85,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    color: "#5f6f52",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#3b3b1a",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    fontSize: 20,
    color: "#603d1a",
  },
  input: {
    backgroundColor: "#eddaba",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  saveButton: {
    backgroundColor: "#6a7e4e",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginTop: 6,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
