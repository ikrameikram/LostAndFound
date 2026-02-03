import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddObject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    type: "perdu",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  // On utilise un objet pour stocker le texte et le type (success ou error)
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" }); // Réinitialise au clic

    try {
      const response = await api.post("/objects", formData);

      if (response.status === 200 || response.status === 201) {
        // MESSAGE DE SUCCÈS
        setStatus({
          type: "success",
          message: "Votre objet est enregistré avec succès ! ✅",
        });

        // Redirection après 2 secondes
        setTimeout(() => {
          navigate("/my-objects");
        }, 2000);
      }
    } catch (err) {
      console.error("Erreur détaillée:", err.response?.data);

      // MESSAGE D'ÉCHEC DE VALIDATION
      // On récupère le message d'erreur du backend s'il existe
      const errorDetail =
        err.response?.data?.message ||
        "Échec de l'enregistrement. Vérifiez vos données.";

      setStatus({
        type: "error",
        message: `Erreur : ${errorDetail} ❌`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-14 py-10 flex justify-center w-full">
      <div className="w-full max-w-2xl bg-white border rounded-2xl shadow-sm p-8 relative">
        {/* AFFICHAGE DU MESSAGE (SUCCÈS OU ERREUR) */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-bold border animate-in fade-in duration-500 ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-red-100 text-red-700 border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 text-[#0044CC] rounded-full flex items-center justify-center font-bold text-3xl shadow-inner">
            +
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0044CC]">
              Publier une annonce
            </h1>
            <p className="text-gray-400 text-sm">
              Remplissez les détails de l'objet
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${status.type === "success" ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Titre de l'objet
              </label>
              <input
                type="text"
                required
                className="border-2 border-gray-100 rounded-xl p-3 focus:border-[#0044CC] outline-none transition"
                placeholder="Ex: Clés, Portefeuille..."
                onChange={(e) =>
                  setFormData({ ...formData, titre: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Type d'annonce
              </label>
              <select
                className="border-2 border-gray-100 rounded-xl p-3 focus:border-[#0044CC] outline-none bg-white cursor-pointer"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="perdu">Objet Perdu 🔴</option>
                <option value="trouve">Objet Trouvé 🟢</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Description détaillée
            </label>
            <textarea
              required
              rows="4"
              className="border-2 border-gray-100 rounded-xl p-3 focus:border-[#0044CC] outline-none transition resize-none"
              placeholder="Décrivez l'objet..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Lieu
              </label>
              <input
                type="text"
                required
                className="border-2 border-gray-100 rounded-xl p-3 focus:border-[#0044CC] outline-none transition"
                placeholder="Où l'avez-vous perdu/trouvé ?"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Date
              </label>
              <input
                type="date"
                required
                className="border-2 border-gray-100 rounded-xl p-3 focus:border-[#0044CC] outline-none transition"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-objects")}
              className="flex-1 px-6 py-3 border-2 border-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || status.type === "success"}
              className="flex-[2] px-6 py-3 bg-[#0044CC] text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Enregistrement..." : "Créer l'objet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddObject;
