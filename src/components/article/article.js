import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import ArticleTitle from "../article-title";
import Profile from "../profile";
import Tags from "../tags";

import "./article.css";

const Article = () => {
  const authorization = true;

  return (
    <div className="article">
      <div className="block-lt-arcticle">
        <div className="lt-article-main">
          <ArticleTitle />
          <Tags tags={["tag1", "tag2"]} />
          <p className="lt-parag">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
        <div className="block-profile-and-redocution">
          <Profile />
          {authorization ? (
            <div className="redocution-btn">
              <Link to="/">
                <button className="delete-btn">Delete</button>
              </Link>
              <Link to="/edit-article/:slug">
                <button className="edit-btn">Edit</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="article-body">
        <ReactMarkdown>
          Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
          Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
          responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo
          omnes ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides:
          aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit
          hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt
          Venus draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris
          includere etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Article;
