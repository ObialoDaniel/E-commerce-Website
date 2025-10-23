<template>
  <section class="testimonials">
    <div class="testimonials-container">
      <div class="testimonials-header">
        <h1 class="testimonials-title">OUR HAPPY CUSTOMERS</h1>
        <div class="nav-arrows">
          <button class="nav-arrow nav-arrow-left" aria-label="Previous testimonial">
            <arrowLeft />
          </button>
          <button class="nav-arrow nav-arrow-right" aria-label="Next testimonial">
            <arrowRight />
          </button>
        </div>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="stars">
            <star v-for="star in 5" :key="star" />
          </div>

          <div class="reviewer-info">
            <h3 class="reviewer-name">Sarah M.</h3>
            <div class="verified">
              <checkIcon />
            </div>
          </div>

          <p class="review-text">
            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
          </p>
        </div>

        <div class="testimonial-card">
          <div class="stars">
            <star v-for="star in 5" :key="star" />
          </div>

          <div class="reviewer-info">
            <h3 class="reviewer-name">Alex K.</h3>
            <div class="verified">
              <checkIcon />
            </div>
          </div>

          <p class="review-text">
            "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
          </p>
        </div>

        <div class="testimonial-card">
          <div class="stars">
            <star v-for="star in 5" :key="star" />
          </div>

          <div class="reviewer-info">
            <h3 class="reviewer-name">James L.</h3>
            <div class="verified">
              <checkIcon />
            </div>
          </div>

          <p class="review-text">
            "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import checkIcon from '@/components/check.vue';
import star from '@/components/star.vue';
import arrowLeft from '@/components/arrowLeft.vue';
import arrowRight from '@/components/arrowRight.vue';
</script>

<style scoped>
.testimonials {
  padding: 5rem 2rem;
  background: #fff;
}

.testimonials-container {
  max-width: 1240px;
  margin: 0 auto;
}

.testimonials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.testimonials-title {
  font-family: var(--font-primary);
  font-size: 48px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.nav-arrows {
  display: flex;
  gap: 16px;
  align-items: center;
}

.nav-arrow {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.nav-arrow:hover {
  transform: scale(1.1);
}

.nav-arrow:active {
  transform: scale(0.95);
}

.nav-arrow svg {
  width: 24px;
  height: 24px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.testimonial-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 28px 32px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.stars {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.stars svg {
  width: 22px;
  height: 22px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.reviewer-name {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.verified {
  display: flex;
  align-items: center;
}

.verified svg {
  width: 20px;
  height: 20px;
}

.review-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  line-height: 1.6;
  font-family: var(--font-secondary);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonials-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 3rem 1rem;
  }

  .testimonials-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 30px;
  }

  .testimonials-title {
    font-size: 32px;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .testimonial-card {
    padding: 24px;
  }
}
</style>
